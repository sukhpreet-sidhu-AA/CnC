import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage';
import CharacterPage from '../components/CharacterPage/CharacterPage';
import CreateCharacterPage from '../components/CreateCharacterPage';
import CharacterEditPage from '../components/CharacterEditPage/CharacterEditPage';
import CampaignPage from '../components/CampaignPage/CampaignPage';
import CreateCampaignPage from '../components/CreateCampaignPage/CreateCampaignPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "characters/:charId",
        element: <CharacterPage />
      },
      {
        path: "characters/new",
        element: <CreateCharacterPage />
      },
      {
        path: "characters/:charId/edit",
        element: <CharacterEditPage />
      },
      {
        path: "campaigns/:campId",
        element: <CampaignPage />
      },
      {
        path: "campaigns/new",
        element: <CreateCampaignPage />
      }
    ],
  },
]);