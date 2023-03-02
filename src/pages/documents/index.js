import { Box, Container } from '@mui/material';
import { DocumentListResults } from '../../components/documents/document-list-results';
import { DocumentListToolbar } from '../../components/documents/document-list-toolbar';
import { DashboardLayout } from '../../components/dashboard/index';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDocument } from '../../redux/actions/documets'
import { setDocumentData } from '../../redux/setStore';

const document = [
  // {
  //     id: 0,
  //     data: "",
  //     name: "",
  //     creationDate: "",
  //     description: ""
  // }
];

const DocumentsPage = () => {
  const dispatch = useDispatch();
  const documentReducer = useSelector(state => state.documentReducer)
  const [documents, setDocuments] = useState(document);

  useEffect(() => {
    const fetchData = async () => {
      documentReducer.documents = null;
      dispatch(setDocument(documentReducer));
      await setDocumentData();
    }

    fetchData();
  }, [])

  useEffect(() => {
    setDocuments(documentReducer.documents);
  }, [documentReducer])

  const hendleSearch = (data) => {
    setDocuments(data)
  }

  return (
    <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <DocumentListToolbar
            projectId={documentReducer.projectId}
            projectName={documentReducer.projectName}
            search={hendleSearch}
          />
          <Box sx={{ mt: 3 }}>
            {document !== null ?
              <DocumentListResults documents={documents} />
              : <></>}
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
}

export default DocumentsPage;
