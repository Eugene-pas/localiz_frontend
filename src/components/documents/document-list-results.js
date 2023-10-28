import { useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  TableContainer,
} from "@mui/material";
import { TRANSLATE } from "../../navigation/CONSTANTS";
import { Delete as IconDelete } from "@mui/icons-material";
import { deleteDocument } from "../../services/document";
import { setDocumentData } from "../../redux/setStore";
import { setContent } from "../../redux/actions/content";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CircularProgressWithLabel from "./circular-progress-with-label";
import { useTranslation } from "react-i18next";

export const DocumentListResults = ({ documents, ...rest }) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [onDelete, setOnDelete] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (documentId) => {
    setOnDelete(true);
    await deleteDocument(documentId);
    await setDocumentData();
    setOnDelete(false);
  };

  const onRowClick = (doc) => {
    dispatch(
      setContent({
        documentId: doc.id,
        documentName: doc.name,
      })
    );
    navigate(TRANSLATE);
  };

  return (
    <Card {...rest}>
      <TableContainer>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t("name")}</TableCell>
              <TableCell>{t("creationDate")}</TableCell>
              <TableCell>{t("translationProgress")}</TableCell>
              <TableCell>{t("action")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents !== null && documents.length !== 0 ? (
              documents
                .slice(page * limit, page * limit + limit)
                .map((document) => (
                  <TableRow
                    hover
                    key={document.id}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell
                      onClick={() =>
                        onRowClick({ id: document.id, name: document.name })
                      }
                    >
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {document.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        onRowClick({ id: document.id, name: document.name })
                      }
                    >
                      {moment.utc(document.creationDate).format("DD/MM/yyyy")}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        onRowClick({ id: document.id, name: document.name })
                      }
                    >
                      <CircularProgressWithLabel
                        value={document.translationProgress}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        disabled={onDelete}
                        onClick={() => {
                          handleDelete(document.id);
                        }}
                      >
                        <IconDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell height={"100vh"} colSpan={5} align="center">
                  {t("noDataAvailable")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {documents !== null && documents.length !== 0 ? (
        <TablePagination
          labelRowsPerPage={t("tablePagination.labelRowsPerPage")}
          labelDisplayedRows={({ from, to, count }) =>
            t("tablePagination.labelDisplayedRows", { from, to, count })
          }
          labelDisplayedRowsUnknown={({ count }) =>
            t("tablePagination.labelDisplayedRowsUnknown", { count })
          }
          labelRowsSelect={t("tablePagination.labelRowsSelect")}
          component="div"
          count={documents.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      ) : (
        <></>
      )}
    </Card>
  );
};
