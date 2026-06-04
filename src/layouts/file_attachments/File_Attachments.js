import React, { useState, useRef, useEffect } from "react";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Grid,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  LinearProgress,
  InputBase,
  Divider,
  CircularProgress,
  Checkbox,
  Tooltip,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PreviewIcon from "@mui/icons-material/Preview";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Utility/Loader";


const FileAttachments = () => {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);


  // const UPLOAD_API_ENDPOINT = "https://esystems.cdl.lk/backendDGES/BizTrack/Attachment/UploadFile";
  // const GET_FILES_API_ENDPOINT = "https://esystems.cdl.lk/backendDGES/BizTrack/Attachment/GetFileDetails";
  // const FILE_PREVIEW_API_ENDPOINT = "https://esystems.cdl.lk/backendDGES/BizTrack/Attachment/FilePreview";
  // const DELETE_API_ENDPOINT = "https://esystems.cdl.lk/backendDGES/BizTrack/Attachment/DeleteFiles";

  const UPLOAD_API_ENDPOINT = "https://esystems.cdl.lk/backend/BizTrack/Attachment/UploadFile";
  const GET_FILES_API_ENDPOINT = "https://esystems.cdl.lk/backend/BizTrack/Attachment/GetFileDetails";
  const FILE_PREVIEW_API_ENDPOINT = "https://esystems.cdl.lk/backend/BizTrack/Attachment/FilePreview";
  const DELETE_API_ENDPOINT = "https://esystems.cdl.lk/backend/BizTrack/Attachment/DeleteFiles";
 
  const { authKey } = useAuth();

  const MAX_FILE_SIZE = 120 * 1024 * 1024;
  const ALLOWED_FILE_TYPES = [".jpg", ".jpeg", ".png", ".gif", ".pdf", ".mp4"];

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetch(GET_FILES_API_ENDPOINT, {
        method: "GET",
        headers: {
          "auth-key": authKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.StatusCode === 200 && data.ResultSet) {
        const apiFiles = await Promise.all(
          data.ResultSet.map(async (item) => {
            const fileType = getFileTypeFromName(item.Doc_FileName);
            let previewUrl = null;

            if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
              try {
                const previewResponse = await fetch(
                  `${FILE_PREVIEW_API_ENDPOINT}?P_SERIAL_NO=${item.Doc_SerialNo}`,
                  {
                    method: "GET",
                    headers: {
                      "auth-key": authKey,
                    },
                  }
                );

                if (previewResponse.ok) {
                  const blob = await previewResponse.blob();
                  previewUrl = URL.createObjectURL(blob);
                }
              } catch (error) {
                console.error("Error fetching preview:", error);
              }
            }

            return {
              id: item.Doc_SerialNo,
              name: item.Doc_FileName,
              date: new Date().toLocaleString(),
              url: previewUrl || null,
              type: fileType,
              size: item.Doc_FileSize ? formatFileSize(item.Doc_FileSize) : "",
              path: item.Doc_FilePath,
              serviceNo: item.Doc_Serviceno,
              year: item.Doc_Year,
            };
          })
        );

        const sortedFiles = apiFiles.sort((a, b) => b.id - a.id);
        setFiles(sortedFiles);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.url) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [files]);

  const getFileTypeFromName = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "pdf":
        return "application/pdf";
      case "mp4":
        return "video/mp4";
      default:
        return "application/octet-stream";
    }
  };

  const isImage = (file) => {
    return file && file.type && file.type.startsWith("image/");
  };

  const isVideo = (file) => {
    return file && file.type && file.type.startsWith("video/");
  };

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        title: "File Too Large",
        text: "Files must be smaller than 20MB.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
      });
      return false;
    }

    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      Swal.fire({
        title: "Unsupported File Type",
        text: `Allowed file types: ${ALLOWED_FILE_TYPES.join(", ")}`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
      });
      return false;
    }

    return true;
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    let totalSize = 0;
    let isValid = true;

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        Swal.fire({
          title: "File Too Large",
          text: "Files must be smaller than 20MB.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#f44336",
        });
        isValid = false;
        return false;
      }
      totalSize += file.size;
      return true;
    });

    if (selectedFiles.length > 1 && totalSize > MAX_FILE_SIZE) {
      Swal.fire({
        title: "Files Too Large",
        text: "Files must be smaller than 20MB.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
      });
      isValid = false;
    }

    if (isValid) {
      setFileInput(validFiles);
    } else if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCameraClick = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          Swal.fire({
            title: "Take a Photo",
            html: `
            <div style="position: relative; width: 100%; max-width: 500px; margin: 0 auto;">
              <video id="camera-preview" width="100%" height="auto" autoplay style="border-radius: 12px;"></video>
            </div>
          `,
            showCancelButton: true,
            confirmButtonText: "Capture",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#f44336",
            didOpen: () => {
              const videoElem = document.getElementById("camera-preview");
              videoElem.srcObject = stream;
            },
            preConfirm: async () => {
              const videoElem = document.getElementById("camera-preview");
              const canvas = document.createElement("canvas");
              canvas.width = videoElem.videoWidth;
              canvas.height = videoElem.videoHeight;
              canvas.getContext("2d").drawImage(videoElem, 0, 0);
              const dataURL = canvas.toDataURL("image/jpeg");
              const file = dataURLtoFile(
                dataURL,
                `photo_${new Date().getTime()}.jpg`
              );

              stream.getTracks().forEach((track) => track.stop());

              if (validateFile(file)) {
                setFileInput([file]);
                handleUpload([file]);
              } else {
                setFileInput(null);
              }
            },
            willClose: () => {
              stream.getTracks().forEach((track) => track.stop());
            },
          });
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
          Swal.fire({
            title: "Camera Error",
            text: "We couldn't access your camera. Please check your permissions.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#4CAF50",
          });
        });
    } else {
      Swal.fire({
        title: "Browser Not Supported",
        text: "Your browser doesn't support camera access.",
        confirmButtonText: "OK",
        confirmButtonColor: "#4CAF50",
      });
    }
  };

  const dataURLtoFile = (dataURL, filename) => {
    try {
      const arr = dataURL.split(",");
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    } catch (error) {
      console.error("Error converting data URL to file:", error);
      return new File([new Uint8Array(0)], filename, { type: "image/jpeg" });
    }
  };

  const handleUpload = async (files) => {
    if (files && files.length > 0) {
      setIsUploading(true);
      setUploadProgress(0);

      try {
        for (const file of files) {
          if (!validateFile(file)) continue;

          const formData = new FormData();
          formData.append("ImageFile", file);

          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              setUploadProgress(progress);
            }
          });

          await new Promise((resolve, reject) => {
            xhr.open("POST", UPLOAD_API_ENDPOINT);
            xhr.setRequestHeader("auth-key", authKey);

            xhr.onload = () => {
              try {
                const response = JSON.parse(xhr.responseText);

                if (xhr.status >= 200 && xhr.status < 300) {
                  if (response.StatusCode && response.StatusCode !== 200) {
                    reject(new Error(response.Result || "Upload failed"));
                  } else {
                    resolve();
                  }
                } else {
                  reject(new Error(response.Result || xhr.statusText || "Upload failed"));
                }
              } catch (err) {
                reject(new Error("Invalid server response"));
              }
            };


            xhr.onerror = () => {
              reject(new Error("Network error occurred"));
            };

            xhr.send(formData);
          });
        }

        await fetchFiles();
        if (fileInputRef.current) fileInputRef.current.value = "";
        setFileInput(null);

        Swal.fire({
          title: "Upload Complete",
          text: "Your files have been uploaded successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#4CAF50",
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error("Upload error:", error);
        Swal.fire({
          title: "Upload Failed",
          text: error.message || "There was a problem uploading your files.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#f44336",
        });
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    } else {

      Swal.fire({
        title: "No File Selected",
        text: "Please select files to upload.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#4CAF50",
      });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0 || !bytes) return "Unknown";
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handlePreview = (file) => {
    if (isSelectMode) return;
    setSelectedFile(file);
    setOpenPreview(true);
  };

  const handleDeleteFile = async (fileId) => {
    Swal.fire({
      title: "Delete File?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#9e9e9e",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${DELETE_API_ENDPOINT}?P_SERIAL_NO=${fileId}`,
            {
              method: "DELETE",
              headers: {
                "auth-key": authKey,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if (data.StatusCode === 200) {
            setFiles((prevFiles) =>
              prevFiles.filter((file) => file.id !== fileId)
            );
            setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
            setOpenPreview(false);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted successfully.",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#4CAF50",
              timer: 1500,
              timerProgressBar: true,
            });
          } else {
            throw new Error(data.Message || "Failed to delete file");
          }
        } catch (error) {
          console.error("Error deleting file:", error);
          Swal.fire({
            title: "Delete Failed",
            text: error.message || "There was a problem deleting your file.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#f44336",
          });
        }
      }
    });
  };

  const handleDownload = (file) => {
    if (!file || !file.url) {
      Swal.fire({
        title: "Download Failed",
        text: "File cannot be downloaded. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
      });
      return;
    }
    try {
      const a = document.createElement("a");
      a.href = file.url;
      a.download =
        file.name ||
        `download_${new Date().getTime()}.${file.type.split("/")[1] || "file"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      Swal.fire({
        title: "Download Started",
        text: "Your file download has started.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4CAF50",
        timer: 1500,
        timerProgressBar: true,
      });

    } catch (error) {
      console.error("Download error:", error);
      Swal.fire({
        title: "Download Failed",
        text: "There was a problem downloading your file.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
      });
    }
  };

  // const handleBulkDownload = async () => {
  // if (selectedFiles.length === 0) return;


  // try {
  //   setIsLoading(true);

  //   const JSZip = await import('jszip');
  //   const zip = new JSZip.default();


  //   const downloadPromises = selectedFiles.map(async (fileId) => {
  //     const file = files.find(f => f.id === fileId);
  //     if (!file || !file.url) return;

  //     try {
  //       const response = await fetch(file.url);
  //       const blob = await response.blob();
  //       zip.file(file.name, blob);
  //     } catch (error) {
  //       console.error(`Error downloading file ${file.name}:`, error);
  //     }
  //   });

  //   await Promise.all(downloadPromises);


  //   const zipBlob = await zip.generateAsync({ type: 'blob' });


  //   const downloadUrl = URL.createObjectURL(zipBlob);
  //   const a = document.createElement('a');
  //   a.href = downloadUrl;
  //   a.download = `downloads_${new Date().getTime()}.zip`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);


  //   URL.revokeObjectURL(downloadUrl);

  //   Swal.fire({
  //     title: "Download Started",
  //     text: `Downloading ${selectedFiles.length} file(s) as a ZIP archive.`,
  //     icon: "success",
  //     confirmButtonText: "OK",
  //     confirmButtonColor: "#4CAF50",
  //     timer: 1500,
  //     timerProgressBar: true,
  //   });
  // } catch (error) {
  //   console.error("Bulk download error:", error);
  //   Swal.fire({
  //     title: "Download Failed",
  //     text: "There was a problem preparing your download.",
  //     icon: "error",
  //     confirmButtonText: "OK",
  //     confirmButtonColor: "#f44336",
  //   });
  // } finally {
  //   setIsLoading(false);
  // }
  // };


  const handleBulkDownload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setIsLoading(true);


      for (const fileId of selectedFiles) {
        const file = files.find(f => f.id === fileId);
        if (!file || !file.url) continue;

        try {

          const a = document.createElement('a');
          a.href = file.url;
          a.download = file.name || `download_${new Date().getTime()}.${file.type.split('/')[1] || 'file'}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);


          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error downloading file ${file.name}:`, error);
        }
      }

      Swal.fire({
        title: "Download Started",
        text: `Downloading ${selectedFiles.length} file(s).`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4CAF50",
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Bulk download error:", error);
      Swal.fire({
        title: "Download Failed",
        text: "There was a problem preparing your download.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#f44336",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (!isSelectMode) {
      setSelectedFiles([]);
    }
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const selectAllFiles = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map((file) => file.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedFiles.length === 0) return;


    Swal.fire({
      title: `Delete ${selectedFiles.length} File(s)?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#9e9e9e",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deletePromises = selectedFiles.map((fileId) =>
            fetch(`${DELETE_API_ENDPOINT}?P_SERIAL_NO=${fileId}`, {
              method: "DELETE",
              headers: {
                "auth-key": authKey,
                "Content-Type": "application/json",
              },
            })
          );

          await Promise.all(deletePromises);
          await fetchFiles();
          setSelectedFiles([]);
          setIsSelectMode(false);

          Swal.fire({
            title: "Deleted!",
            text: `Successfully deleted ${selectedFiles.length} file(s).`,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#4CAF50",
            timer: 1500,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error("Bulk delete error:", error);
          Swal.fire({
            title: "Delete Failed",
            text: "There was a problem deleting the selected files.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#f44336",
          });
        }
      }
    });
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <div>
      {isLoading ? (
        <Loader />
      ) : (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginLeft: 2, marginBottom: 2 }}
        >
          Media Gallery
        </Typography>


        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none", marginBottom: 2, borderRadius: "8px" }}
        >
          Back
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: "12px",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fafafa",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "500" }}>
            Add New Files
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 2, display: "block", fontStyle: "italic" }}
          >
            Max file size: 20MB
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<FileUploadIcon />}
              onClick={() => fileInputRef.current.click()}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                p: "10px 20px",
                backgroundColor: "#2196f3",
                "&:hover": { backgroundColor: "#1976d2" },
              }}
            >
              Select File
            </Button>

            <Button
              variant="contained"
              startIcon={<CameraAltIcon />}
              onClick={handleCameraClick}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                p: "10px 20px",
                backgroundColor: "#9c27b0",
                "&:hover": { backgroundColor: "#7b1fa2" },
              }}
            >
              Take Photo
            </Button>

            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png,.gif,.pdf,.mp4"
              multiple
            />
          </Box>

          <Paper
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
              mb: 2,
              transition: "all 0.3s",
              "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
            }}
          >
            <IconButton sx={{ p: "10px" }}>
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1, p: "10px" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>

          {fileInput && (
            <Fade in={fileInput}>
              <Box
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px dashed #ccc",
                  borderRadius: "8px",
                  bgcolor: "#e3f2fd",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "500" }}>
                  Selected:{" "}
                  {fileInput.length === 1
                    ? fileInput[0].name
                    : `(${fileInput.length} Files)`}{" "}
                  (
                  {formatFileSize(
                    fileInput.reduce((total, file) => total + file.size, 0)
                  )}
                  )
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleUpload(fileInput)}
                  sx={{
                    mt: 1,
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#388e3c" },
                  }}
                >
                  Upload Now
                </Button>
              </Box>
            </Fade>
          )}

          {isUploading && (
            <Box sx={{ width: "100%", mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Uploading: {uploadProgress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={uploadProgress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#4CAF50",
                  },
                }}
              />
            </Box>
          )}
        </Box>

        {/* Header section with files count and action buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", flexShrink: 0 }}
          >
            Your Files ({filteredFiles.length})
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "nowrap",
              justifyContent: "flex-end",
            }}
          >
            {isSelectMode && selectedFiles.length > 0 && (
              <>
                <Tooltip title="Download selected files">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleBulkDownload}
                    startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
                    sx={{ borderRadius: "8px", textTransform: "none", fontSize: "0.8rem" }}
                  >
                    Download ({selectedFiles.length})
                  </Button>
                </Tooltip>
                <Tooltip title="Delete selected files">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleBulkDelete}
                    startIcon={<DeleteIcon sx={{ fontSize: 18 }} />}
                    sx={{ borderRadius: "8px", textTransform: "none", fontSize: "0.8rem" }}
                  >
                    Delete ({selectedFiles.length})
                  </Button>
                </Tooltip>
              </>
            )}
            <Tooltip title={isSelectMode ? "Cancel selection" : "Select files"}>
              <Button
                variant={isSelectMode ? "contained" : "outlined"}
                color={isSelectMode ? "secondary" : "primary"}
                onClick={toggleSelectMode}
                startIcon={
                  isSelectMode ? (
                    <CancelIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <SelectAllIcon sx={{ fontSize: 18 }} />
                  )
                }
                sx={{ borderRadius: "8px", textTransform: "none", fontSize: "0.8rem" }}
              >
                {isSelectMode ? "Cancel" : "Select"}
              </Button>
            </Tooltip>
          </Box>
        </Box>

        {/* Scrollable gallery area */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : hasError ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
                backgroundColor: "#fdf3f4",
                borderRadius: "12px",
                p: 3,
              }}
            >
              <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                Failed to load files. Please try again.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={fetchFiles}
                startIcon={<RefreshIcon />}
                sx={{ borderRadius: "8px" }}
              >
                Retry
              </Button>
            </Box>
          ) : filteredFiles.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
                backgroundColor: "#f5f5f5",
                borderRadius: "12px",
                p: 3,
              }}
            >
              <ImageIcon sx={{ fontSize: 60, color: "#9e9e9e", mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No files uploaded yet. Upload photos or documents to see them here.
              </Typography>
            </Box>
          ) : (
            <>
              {isSelectMode && (
                <Fade in={isSelectMode}>
                  <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={selectedFiles.length === filteredFiles.length}
                      indeterminate={
                        selectedFiles.length > 0 &&
                        selectedFiles.length < filteredFiles.length
                      }
                      onChange={selectAllFiles}
                      sx={{ color: "#2196f3", "&.Mui-checked": { color: "#2196f3" } }}
                    />
                    <Typography variant="body2" sx={{ color: "#2196f3" }}>
                      {selectedFiles.length} selected
                    </Typography>
                  </Box>
                </Fade>
              )}

              {/* Scrollable grid container */}
              <Box
                sx={{
                  overflowY: "auto",
                  flexGrow: 1,
                  maxHeight: "calc(100vh - 400px)",
                  pr: 1,
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#c1c1c1',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#a8a8a8',
                  },
                }}
              >
                <Grid container spacing={2}>
                  {filteredFiles.map((file) => (
                    <Grid item xs={6} sm={4} md={3} key={file.id}>
                      <Paper
                        elevation={2}
                        sx={{
                          borderRadius: "12px",
                          overflow: "hidden",
                          position: "relative",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "all 0.3s",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          },
                          border: selectedFiles.includes(file.id)
                            ? "2px solid #2196f3"
                            : "2px solid transparent",
                          bgcolor: selectedFiles.includes(file.id)
                            ? "rgba(33, 150, 243, 0.1)"
                            : "white",
                        }}
                      >
                        {isSelectMode && (
                          <Checkbox
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => toggleFileSelection(file.id)}
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              zIndex: 1,
                              color: "white",
                              "&.Mui-checked": { color: "#2196f3" },
                              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                            }}
                          />
                        )}

                        <Box
                          sx={{
                            height: "140px",
                            backgroundColor: isImage(file) || isVideo(file) ? "transparent" : "#f5f5f5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            position: "relative",
                            cursor: isSelectMode ? "default" : "pointer",
                          }}
                          onClick={() => handlePreview(file)}
                        >
                          {isImage(file) && file.url ? (
                            <img
                              src={file.url}
                              alt={file.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "opacity 0.3s",
                                opacity: selectedFiles.includes(file.id) ? 0.8 : 1,
                              }}
                            />
                          ) : isVideo(file) && file.url ? (
                            <Box sx={{
                              position: 'relative',
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#000'
                            }}>
                              <video
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  opacity: selectedFiles.includes(file.id) ? 0.8 : 1
                                }}
                              >
                                <source src={file.url} type={file.type} />
                              </video>
                              <PlayCircleOutlineIcon sx={{
                                position: 'absolute',
                                color: 'white',
                                fontSize: 48,
                                opacity: 0.7
                              }} />
                            </Box>
                          ) : (
                            <Avatar
                              sx={{
                                width: 60,
                                height: 60,
                                backgroundColor: "#bbdefb",
                              }}
                            >
                              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                {file.name.split(".").pop().toUpperCase()}
                              </Typography>
                            </Avatar>
                          )}
                        </Box>

                        <Box sx={{ p: 1.5, flexGrow: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "500",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {file.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {file.size} • {file.date}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            p: 1,
                            pt: 0,
                            justifyContent: "space-between",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handlePreview(file)}
                            sx={{ color: "#2196f3" }}
                            disabled={isSelectMode}
                          >
                            <PreviewIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </Paper>

      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isFullScreen}
      >
        {selectedFile && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  {selectedFile.name}
                  <Typography variant="caption" display="block" color="text.secondary">
                    {selectedFile.date}
                  </Typography>
                </Box>
                <IconButton onClick={() => setIsFullScreen(!isFullScreen)}>
                  {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent sx={{
              p: 0,
              textAlign: 'center',
              bgcolor: '#f5f5f5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: isFullScreen ? '100%' : 'auto'
            }}>
              {isImage(selectedFile) && selectedFile.url ? (
                <img
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: isFullScreen ? '100%' : '70vh',
                    objectFit: isFullScreen ? 'contain' : 'scale-down'
                  }}
                />
              ) : isVideo(selectedFile) && selectedFile.url ? (
                <video
                  controls
                  autoPlay
                  style={{
                    maxWidth: '100%',
                    maxHeight: isFullScreen ? '100%' : '70vh',
                    backgroundColor: '#000'
                  }}
                >
                  <source src={selectedFile.url} type={selectedFile.type} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ width: 100, height: 100, mb: 2, backgroundColor: '#bbdefb' }}>
                    <Typography variant="h4">
                      {selectedFile.name.split('.').pop().toUpperCase()}
                    </Typography>
                  </Avatar>
                  <Typography>This file type cannot be previewed.</Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDownload(selectedFile)}
                color="success"
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{ mr: 1, borderRadius: '8px' }}
              >
                Download
              </Button>
              <Button
                onClick={() => handleDeleteFile(selectedFile.id)}
                color="error"
                variant="contained"
                startIcon={<DeleteIcon />}
                sx={{ borderRadius: '8px' }}
              >
                Delete
              </Button>
              <Button
                onClick={() => setOpenPreview(false)}
                color="primary"
                variant="contained"
                sx={{ borderRadius: '8px' }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
     )}
    </div>
  );
};

export default FileAttachments;