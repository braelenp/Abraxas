import { Navigate, Route, Routes } from 'react-router-dom';
import { CurriculumHub } from './Curriculum';
import { Module1_Strategy } from './modules/Module1_Strategy';
import { Module2_Tokenization } from './modules/Module2_Tokenization';
import { Module3_Vaults } from './modules/Module3_Vaults';
import { Module4_Species } from './modules/Module4_Species';
import { Module5_Sovereignty } from './modules/Module5_Sovereignty';

export function AcademyPage() {
  return (
    <Routes>
      <Route index element={<CurriculumHub />} />
      <Route path="strategy" element={<Module1_Strategy />} />
      <Route path="tokenization" element={<Module2_Tokenization />} />
      <Route path="vaults" element={<Module3_Vaults />} />
      <Route path="species" element={<Module4_Species />} />
      <Route path="sovereignty" element={<Module5_Sovereignty />} />
      <Route path="*" element={<Navigate to="/app/academy" replace />} />
    </Routes>
  );
}