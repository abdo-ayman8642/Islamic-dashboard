import { ReactElement, ReactNode, useState } from "react";
import { useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";

import MuiButton from "components/UI/MuiButton";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
interface Props {
  onDrop: (files: File[]) => void;
  onDelete?: (file: File) => void;
  uploadedFiles: any[];
}

const DropzoneContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
});

function Dropzone({ onDrop, onDelete, uploadedFiles }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      onDrop(acceptedFiles);
    },
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
      "text/*": [".txt", ".pdf", ".doc", ".docx", ".odt"],
      "application/*": [".zip", ".rar"],
    }
  });

  const getIconByMimeType = (fileName: string) => {
    const type = fileName.split(".")[1];
    switch (type) {
      case "pdf": return <Box
        component={"img"}
        src={require('assets/icons/pdf.png')}
        sx={{
          width: "100%",
          height: "100%",
          padding: 1,
          objectFit: "fill",
          borderRadius: 1,
        }}
        alt="pdf"
      />;

      case "zip": return <Box
        component={"img"}
        src={require('assets/icons/zip.png')}
        sx={{
          width: "100%",
          height: "100%",
          padding: 1,
          objectFit: "fill",
          borderRadius: 1,
        }}
        alt="pdf"
      />;

      case "rar": return <Box
        component={"img"}
        src={require('assets/icons/rar.jpeg')}
        sx={{
          width: "100%",
          height: "100%",
          padding: 1,
          objectFit: "fill",
          borderRadius: 1,
        }}
        alt="pdf"
      />;
      case "docx" || "doc" || "odt": return <Box
        component={"img"}
        src={require('assets/icons/docs.jpg')}
        sx={{
          width: "100%",
          height: "100%",
          padding: 1,
          objectFit: "fill",
          borderRadius: 1,
        }}
        alt="pdf"
      />;

      default: return <Box
        component={"img"}
        src={require('assets/icons/file.png')}
        sx={{
          width: "100%",
          height: "100%",
          padding: 1,
          objectFit: "fill",
          borderRadius: 1,
        }}
        alt="pdf"
      />;
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: { xs: 250, md: 350 },
      border: '1px dashed #ccc',
      borderRadius: 1,
    }}>
      {(!uploadedFiles || uploadedFiles?.length <= 2) && <DropzoneContainer {...getRootProps()}>
        < input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="h5" component="h2">
            Drop the files here ...
          </Typography>
        ) : (
          <>
            <MuiButton>
              <CloudUploadIcon sx={{ fontSize: 48 }} />
            </MuiButton>
            <Typography variant="h5" component="h2">
              Drag 'n' drop some files here, or click to select files
            </Typography>
          </>
        )}
      </DropzoneContainer>}
      <Box mx={2}>

        {uploadedFiles && uploadedFiles.length > 0 && (
          <Grid container spacing={2}>
            {uploadedFiles.map((file: File, i: number) => (
              <Grid item xs={4} key={i}>

                <Box sx={{
                  height: 150,
                  width: 150,
                  position: "relative",
                  "&:hover": {
                    opacity: 0.5,
                  },
                  "&:hover #delete": {
                    visibility: "visible",
                  },
                  cursor: "pointer",
                }}
                  onClick={() => onDelete ? onDelete(file) : null}
                >
                  {getIconByMimeType(file.name)}
                  <IconButton
                    id="delete"
                    aria-label="delete"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: '25%',
                      right: '35%',
                      color: "red",
                      visibility: "hidden",
                      transition: "opacity 0.2s ease-in-out",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    {file.name}
                  </Typography>

                </Box>

              </Grid>
            ))}
          </Grid>
        )
        }
      </Box>

    </Box>
  );
}

export default Dropzone;