import {
  Box,
  Button,
  Typography
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { Arrow as ArrowIcon } from '../../assets/icons/arrow';
import { useDispatch, useSelector } from 'react-redux';
import { download } from '../../services/document';
import { translationDocument } from '../../services/translateContent';
import { useState } from 'react';
import { setContent } from '../../redux/actions/content';
import { useTranslation } from 'react-i18next';

export const ContentListToolbar = ({ documentName, search, ...props }) => {
  const contentDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const contentReducer = useSelector(state => state.contentReducer);
  const projectId = useSelector(state => state.documentReducer.projectId);
  const project = useSelector(state => state.projectReducer.projects.find(p => p.id === projectId));
  const { t } = useTranslation();

  const hadleDownload = async () => {
    await download({
      documentId: contentReducer.documentId,
      documentName: contentReducer.documentName
    });
  }

  const hadleTranslate = async () => {
    setLoading(true);
    await translationDocument({
      documentId: contentReducer.documentId,
      from: project.fromTranslate.toLowerCase(),
      to: project.toTranslate.toLowerCase()
    });
    setLoading(false);
    contentReducer.isUpdate = !contentReducer.isUpdate;
    contentDispatch(setContent(contentReducer));
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Box textAlign={"center"}>
          <Typography
            sx={{ m: 1 }}
            variant="h5"
          >
            {documentName}
          </Typography>
          <Box
            display={"flex"}
            gap={1}
            justifyContent={"center"}>
            <Typography
              align="center"
              color="textPrimary"
              variant="h6"
            >
              {project.fromTranslate}
            </Typography>
            <ArrowIcon color="action" />
            <Typography
              align="center"
              color="textPrimary"
              variant="h6"
            >
              {project.toTranslate}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{ m: 1 }}
          variant="h5"
        >
          {t("translate")}
        </Typography>
        <Box sx={{ m: 1, display: "flex", gap: 1}}>
          <Button
            onClick={hadleDownload}
            type="button"
            value="upload"
            color="secondary"
            variant="contained"
            component="label">
            {t("getDocument")}
          </Button>
          <Button
            disabled={loading}
            onClick={hadleTranslate}
            color="primary"
            variant="contained"
            component="label">
            {t("translateDocument")}
            {loading && (
            <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />)}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
