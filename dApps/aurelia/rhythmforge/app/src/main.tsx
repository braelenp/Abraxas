import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';

const DISTORTION_STORAGE_KEY = 'rhythmforge_distortion_level';
const savedDistortion = localStorage.getItem(DISTORTION_STORAGE_KEY);
const initialDistortion = savedDistortion === 'low' || savedDistortion === 'high' ? savedDistortion : 'high';
document.documentElement.setAttribute('data-distortion', initialDistortion);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
