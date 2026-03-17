import { OrionAssistant } from '../components/OrionAssistant';

export function OrionPage() {
  return (
    <section className="space-y-3">
      <p className="text-xs text-slate-300/80">Saved chats stay on this device so you can return to previous Orion conversations.</p>
      <OrionAssistant embedded />
    </section>
  );
}
