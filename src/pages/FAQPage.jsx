import { useNavigate } from 'react-router-dom';
import FAQPageComponent from '../components/FAQPage';

export default function FAQPage() {
  const navigate = useNavigate();
  return <FAQPageComponent setView={(view) => navigate(view === 'home' ? '/' : `/${view}`)} />;
}
