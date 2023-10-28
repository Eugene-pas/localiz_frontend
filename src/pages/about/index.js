import { Alert, Box, Divider, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard/index";
import { useTranslation } from "react-i18next";
import "./style.css";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              mb: 1,
            }}
            variant="h4"
          >
            {t("about.mainTitle")}
          </Typography>
          <Typography
            sx={{
              mb: 1,
              ml: 1,
            }}
            variant="h4"
            className="greetingAnim"
          >
            👋
          </Typography>
        </Box>

        <Divider
          sx={{
            borderColor: "#2D3748",
          }}
        />
        <Box
          sx={{
            mt: 3,
          }}
        >
          <Box mb={1}>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
              }}
            >
              {t("about.createProject.title")}
            </Typography>

            <Divider
              sx={{
                borderColor: "#2D3748",
              }}
            />
          </Box>
          <Typography color="textPrimary" variant="body1">
            {t("about.createProject.text_1")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {t("about.createProject.text_2")}
              </Typography>

              <Typography color="textPrimary" variant="body1">
                {t("about.createProject.text_3")}
              </Typography>

              <Typography color="textPrimary" variant="body1">
                <li style={{ listStyleType: "none" }}>
                  {t("about.createProject.li_1")}
                </li>
                <li style={{ listStyleType: "none" }}>
                  {t("about.createProject.li_2")}
                </li>
              </Typography>
            </Box>
            <Box>
              <Box sx={{ aspectRatio: "16/9" }}>
                <video
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                    boxShadow: "2px 4px 6px",
                  }}
                  src="/static/video/c_d.mp4"
                  width="430px"
                  height="235px"
                  autoPlay
                  loop
                  muted
                >
                  {t("about.video")}
                </video>
              </Box>
            </Box>
          </Box>
          <Alert sx={{ mt: 3 }} severity="error">
            <div
              dangerouslySetInnerHTML={{
                __html: t("about.createProject.alert"),
              }}
            ></div>
          </Alert>
        </Box>

        <Box
          sx={{
            mt: 3,
          }}
        >
          <Box mb={1}>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
              }}
            >
              {t("about.documentManagement.title")}
            </Typography>
            <Divider
              sx={{
                borderColor: "#2D3748",
              }}
            />
          </Box>
          <Typography color="textPrimary" variant="body1">
            {t("about.documentManagement.text_1")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              mt: 2,
            }}
          >
            <Box
              sx={{
                mr: "auto",
                ml: "auto",
              }}
            >
              <Box sx={{ aspectRatio: "16/9" }}>
                <video
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                    boxShadow: "2px 4px 6px",
                  }}
                  src="/static/video/doc.mp4"
                  width="430px"
                  height="235px"
                  autoPlay
                  loop
                  muted
                >
                  {t("about.video")}
                </video>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <Box mb={1}>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
              }}
            >
              {t("about.localization.title")}
            </Typography>
            <Divider
              sx={{
                borderColor: "#2D3748",
              }}
            />
          </Box>
          <Typography color="textPrimary" variant="body1">
            {t("about.localization.text_1")}
          </Typography>

          <Alert sx={{ my: 3 }} severity="success">
            {t("about.localization.alert")}
          </Alert>

          <Typography color="textPrimary" variant="body1">
            {t("about.localization.text_2")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {t("about.localization.text_3")}
              </Typography>

              <Typography color="textPrimary" variant="body1">
                <li>{t("about.localization.li_1")}</li>
                <li>{t("about.localization.li_2")}</li>
              </Typography>
            </Box>

            <Box>
              <Box sx={{ aspectRatio: "16/9" }}>
                <video
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                    boxShadow: "2px 4px 6px",
                  }}
                  src="/static/video/loc_320x240.mp4"
                  width="430px"
                  height="235px"
                  autoPlay
                  loop
                  muted
                >
                  {t("about.video")}
                </video>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default AboutPage;
