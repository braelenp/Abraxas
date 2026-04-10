# Copy-Paste Translation Patterns

Quick snippets to speed up translation implementation across pages.

---

## Pattern 1: Simple Page with Header and Content

```tsx
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export function MyPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-cyan-500/30 bg-slate-900/80 backdrop-blur-xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-cyan-300">{t('section.title')}</h1>
          <LanguageSwitcher variant="compact" />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <p className="text-slate-300">{t('section.description')}</p>
      </main>
    </div>
  );
}
```

---

## Pattern 2: Page with Tabs

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function TabbedPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = ['overview', 'details', 'settings'] as const;

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex gap-2 px-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition whitespace-nowrap border-b-2 ${
                activeTab === tab
                  ? 'text-cyan-300 border-cyan-500'
                  : 'text-slate-400 border-transparent hover:text-slate-300'
              }`}
            >
              {t(`section.tabs.${tab}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'overview' && <div>{t('section.overview')}</div>}
        {activeTab === 'details' && <div>{t('section.details')}</div>}
        {activeTab === 'settings' && <div>{t('section.settings')}</div>}
      </div>
    </div>
  );
}
```

Required translation keys:
```json
{
  "section": {
    "tabs": {
      "overview": "Overview",
      "details": "Details",
      "settings": "Settings"
    },
    "overview": "Overview content...",
    "details": "Details content...",
    "settings": "Settings content..."
  }
}
```

---

## Pattern 3: Data Table

```tsx
import { useTranslation } from 'react-i18next';

export function DataTable({ data }: { data: any[] }) {
  const { t } = useTranslation();

  const columns = [
    { key: 'name', label: t('table.name') },
    { key: 'amount', label: t('table.amount') },
    { key: 'status', label: t('table.status') },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-cyan-500/20">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left text-xs font-bold text-cyan-300 uppercase tracking-widest"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-slate-300">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

Translation keys:
```json
{
  "table": {
    "name": "Name",
    "amount": "Amount",
    "status": "Status"
  }
}
```

---

## Pattern 4: Form with Validation

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function MyForm() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount) {
      setError(t('errors.invalidAmount'));
      return;
    }

    // Process form...
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {t('form.amount')}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={t('form.enterAmount')}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder-slate-500"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 py-2 px-4 text-white font-bold hover:bg-purple-700 transition"
      >
        {t('buttons.submit')}
      </button>
    </form>
  );
}
```

Translation keys:
```json
{
  "form": {
    "amount": "Amount",
    "enterAmount": "Enter amount..."
  }
}
```

---

## Pattern 5: Modal/Dialog

```tsx
import { useTranslation } from 'react-i18next';

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function MyModal({ isOpen, onClose, onConfirm }: MyModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-300">
            {t('modal.title')}
          </h2>
          
          <p className="text-slate-300">
            {t('modal.description')}
          </p>

          <div className="flex gap-3 justify-end pt-4 border-t border-cyan-500/20">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-500 text-slate-300 hover:bg-slate-800 transition"
            >
              {t('modals.cancel')}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              {t('modals.confirm')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
```

---

## Pattern 6: List with Actions

```tsx
import { useTranslation } from 'react-i18next';
import { Trash2, Edit2 } from 'lucide-react';

export function ItemList({ items }: { items: any[] }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 bg-slate-900/50 border border-cyan-500/20 rounded-lg hover:border-cyan-500/40 transition"
        >
          <div>
            <h3 className="font-bold text-white">{item.name}</h3>
            <p className="text-sm text-slate-400">{item.desc}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 text-slate-400 hover:text-cyan-300 transition"
              title={t('buttons.edit')}
            >
              <Edit2 size={18} />
            </button>
            <button
              className="p-2 text-slate-400 hover:text-red-300 transition"
              title={t('buttons.delete')}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Pattern 7: Loading States

```tsx
import { useTranslation } from 'react-i18next';
import { Loader } from 'lucide-react';

export function LoadingState() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader className="animate-spin text-purple-400" size={32} />
      <p className="text-slate-300">
        {t('common.loading')}
      </p>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <p className="text-slate-400">{message}</p>
    </div>
  );
}

export function ErrorState({ error }: { error: string }) {
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
      <p className="font-bold">{t('common.error')}</p>
      <p className="text-sm mt-1">{error}</p>
    </div>
  );
}
```

---

## Pattern 8: Responsive Button Grid

```tsx
import { useTranslation } from 'react-i18next';

export function ActionButtons() {
  const { t } = useTranslation();

  const buttons = [
    { key: 'save', label: t('buttons.save') },
    { key: 'cancel', label: t('buttons.cancel') },
    { key: 'delete', label: t('buttons.delete') },
  ];

  return (
    <div className="flex gap-3 flex-wrap responsive-button-group">
      {buttons.map((btn) => (
        <button
          key={btn.key}
          className="flex-1 min-w-[120px] rounded-lg bg-purple-600 px-4 py-2 text-white font-bold hover:bg-purple-700 transition"
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
```

Add to CSS for responsive sizing on smaller screens:
```css
@media (max-width: 640px) {
  .responsive-button-group {
    flex-direction: column;
  }
  
  .responsive-button-group > button {
    width: 100%;
  }
}
```

---

## Pattern 9: Info Cards Grid

```tsx
import { useTranslation } from 'react-i18next';

export function InfoCards() {
  const { t } = useTranslation();

  const cards = [
    {
      title: t('card.title1'),
      value: '1,234',
      subtitle: t('card.subtitle1'),
    },
    {
      title: t('card.title2'),
      value: '$50,000',
      subtitle: t('card.subtitle2'),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-purple-900/30 to-slate-900/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm"
        >
          <p className="text-sm text-slate-400 uppercase tracking-widest">
            {card.title}
          </p>
          <p className="text-3xl font-black text-cyan-300 my-2">
            {card.value}
          </p>
          <p className="text-xs text-slate-500">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
```

---

## Pattern 10: Toggle/Switch

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function ToggleExample() {
  const { t } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-cyan-500/20">
      <div>
        <p className="font-bold text-white">
          {t('setting.name')}
        </p>
        <p className="text-sm text-slate-400">
          {t('setting.description')}
        </p>
      </div>
      
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
          isEnabled ? 'bg-purple-600' : 'bg-slate-600'
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
            isEnabled ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
```

---

## Common Translation Keys Reference

Copy these into your translation JSON files as needed:

```json
{
  "buttons": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "submit": "Submit",
    "close": "Close",
    "confirm": "Confirm",
    "continue": "Continue",
    "next": "Next",
    "previous": "Previous",
    "back": "Back"
  },
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "warning": "Warning",
    "info": "Info",
    "empty": "No items found"
  },
  "modals": {
    "close": "Close",
    "confirm": "Confirm",
    "cancel": "Cancel"
  },
  "table": {
    "name": "Name",
    "value": "Value",
    "status": "Status",
    "action": "Action",
    "created": "Created",
    "updated": "Updated"
  },
  "form": {
    "required": "This field is required",
    "invalid": "Invalid input",
    "submit": "Submit"
  },
  "errors": {
    "invalidAmount": "Invalid amount",
    "required": "This field is required",
    "error": "An error occurred"
  },
  "success": {
    "saved": "Saved successfully",
    "updated": "Updated successfully",
    "deleted": "Deleted successfully"
  }
}
```

---

## Pro Tips

1. **Create a constants file** for repeated values:
   ```tsx
   export const TRANSLATION_KEYS = {
     buttons: {
       save: 'buttons.save',
       cancel: 'buttons.cancel',
     },
   } as const;
   ```

2. **Use template literals** for dynamic keys:
   ```tsx
   {t(`section.${activeTab}`)}
   ```

3. **Create helper functions** for common patterns:
   ```tsx
   const formatError = (t: TFunction, code: string) => t(`errors.${code}`);
   ```

4. **Test with shorter AND longer languages** when styling:
   - English (short)
   - German (long words)
   - Arabic (RTL ready)

---

Use these patterns as templates. Modify class names, structure as needed for your specific use case.
