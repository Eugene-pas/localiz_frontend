import { Alert, Box, Container, Divider, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard/index';
import './style.css';

const AboutPage = () => {

    return (
        <DashboardLayout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <Typography
                        sx={{
                            mb: 1
                        }}
                        variant="h4"
                    >
                        Вітаємо в Localiz
                    </Typography>
                    <Typography  sx={{
                            mb: 1,
                            ml: 1
                        }}
                        variant="h4" className='greetingAnim'>👋</Typography>
                </Box>

                <Divider
                    sx={{
                        borderColor: '#2D3748'
                    }}
                />
                <Box sx={{
                    mt: 3
                }}>
                    <Box mb={1}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 1
                            }}
                        >
                            Створити Проект
                        </Typography>

                        <Divider
                            sx={{
                                borderColor: '#2D3748'
                            }}
                        />
                    </Box>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        Для того щоб розпочати роботу в додатку Localiz.
                        Потрібно створити проект. Для цього потрібно відкриту сторінку проектів яка знаходиться на панелі завдань під назвою “Проекти”.
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        mt: 2
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}>
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                Після цього вам потрібно натисніть на кнопку “Створити проект”.
                            </Typography>

                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                Введіть дані про проект який ви будете локалізовувати.
                            </Typography>

                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                <li style={{ listStyleType: 'none' }}>У поле “з якої” вводьте мову яку хочете локалізовувати.</li>
                                <li style={{ listStyleType: 'none' }}>У поле “на яку”  вводьте мову на яку хочете локалізовувати.</li>
                            </Typography>
                        </Box>
                        <Box>
                            <Box sx={{ aspectRatio: '16/9' }}>
                                <video
                                    style={{ borderRadius: "10px", objectFit: 'cover', boxShadow: '2px 4px 6px' }}
                                    src='/static/video/c_d.mp4'
                                    width="430px"
                                    height="235px"
                                    autoPlay
                                    loop
                                    muted>
                                    Your browser does not support the video tag.
                                </video>
                            </Box>
                        </Box>
                    </Box>
                    <Alert sx={{ mt: 3 }} severity="error">

                        Уважно заповнюйте ці поля так як спираючись на них будуть реалізовуватись підказки!
                        Без них вони <b>не працюватимуть</b>!
                    </Alert>
                </Box>

                <Box sx={{
                    mt: 3
                }}>
                    <Box mb={1}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 1
                            }}
                        >
                            Керування документами
                        </Typography>
                        <Divider
                            sx={{
                                borderColor: '#2D3748'
                            }}
                        />
                    </Box>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        На сторінці проекта ви можете безпосередньо додавати документи та видаляти їх.
                        Також ви можете шукати потрібні документи.
                        Клікнувши на конкретний документ ви перейдете на сторінку локалізації.
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 3,
                        mt: 2
                    }}>
                        <Box sx={{
                            mr: 'auto',
                            ml: 'auto'
                        }}>
                            <Box sx={{ aspectRatio: '16/9' }}>
                                <video
                                    style={{ borderRadius: "10px", objectFit: 'cover', boxShadow: '2px 4px 6px' }}
                                    src='/static/video/doc.mp4'
                                    width="430px"
                                    height="235px"
                                    autoPlay
                                    loop
                                    muted>
                                    Your browser does not support the video tag.
                                </video>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    mt: 3
                }}>
                    <Box mb={1}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 1
                            }}
                        >
                            Локалізація
                        </Typography>
                        <Divider
                            sx={{
                                borderColor: '#2D3748'
                            }}
                        />
                    </Box>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        На сторінці локалізації знаходиться таблиці з полями для локалізації.
                        В колонці <b>“DEFAULT”</b> розміщений текст стрічки який потрібно локалізувати.
                    </Typography>

                    <Alert sx={{ my: 3 }} severity="success">
                        Якщо клікнути на текст рядка з’явиться пропозиція щодо його перекладу!
                    </Alert>

                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        Наступне поле для введення перекладу тексту.
                        Якщо вас задовільняє переклад то збережіть його клацнувши на іконку збереження, яка розміщується відразу після поля для перекладу.
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        mt: 2
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}>
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                На початку знаходиться кнопка, яка відкриває додаткові дані про цей рядок.
                            </Typography>

                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                <ul>
                                    <li>Кнопка “Отримати документ” вертає локалізований документ.</li>
                                    <li>Кнопка “Перекласти Документ” автоматично перекладає весь документ.</li>
                                </ul>
                            </Typography>
                        </Box>

                        <Box>
                        <Box sx={{ aspectRatio: '16/9' }}>
                                <video
                                    style={{ borderRadius: "10px", objectFit: 'cover', boxShadow: '2px 4px 6px' }}
                                    src='/static/video/loc_320x240.mp4'
                                    width="430px"
                                    height="235px"
                                    autoPlay
                                    loop
                                    muted>
                                    Your browser does not support the video tag.
                                </video>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </DashboardLayout>
    );
}

export default AboutPage;
