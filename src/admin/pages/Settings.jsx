import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiHome, FiUser, FiLock, FiSun, FiShare2 } from 'react-icons/fi';
import Topbar from '../components/Topbar';
import { useAdmin } from '../context/AdminContext';

const sections = [
  { key: 'store', label: 'Store Information', icon: FiHome },
  { key: 'admin', label: 'Admin Profile', icon: FiUser },
  { key: 'password', label: 'Change Password', icon: FiLock },
  { key: 'theme', label: 'Theme Settings', icon: FiSun },
  { key: 'social', label: 'Social Links', icon: FiShare2 },
];

export default function Settings() {
  const { settings, updateSettings } = useAdmin();
  const [activeSection, setActiveSection] = useState('store');
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'store':
        return (
          <div className="space-y-4">
            {['name', 'email', 'phone', 'address', 'description'].map((field) => (
              <div key={field}>
                <label className="text-sm text-white/60 mb-2 block capitalize">{field}</label>
                {field === 'description' ? (
                  <textarea
                    value={settings.store[field]}
                    onChange={(e) => updateSettings('store', { [field]: e.target.value })}
                    className="admin-input resize-none"
                    rows={3}
                  />
                ) : (
                  <input
                    value={settings.store[field]}
                    onChange={(e) => updateSettings('store', { [field]: e.target.value })}
                    className="admin-input"
                  />
                )}
              </div>
            ))}
          </div>
        );

      case 'admin':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
              >
                {settings.admin.avatar}
              </div>
              <div>
                <p className="font-semibold">{settings.admin.name}</p>
                <p className="text-sm text-white/50">Administrator</p>
              </div>
            </div>
            {['name', 'email'].map((field) => (
              <div key={field}>
                <label className="text-sm text-white/60 mb-2 block capitalize">{field}</label>
                <input
                  value={settings.admin[field]}
                  onChange={(e) => updateSettings('admin', { [field]: e.target.value })}
                  className="admin-input"
                />
              </div>
            ))}
          </div>
        );

      case 'password':
        return (
          <div className="space-y-4">
            {[
              { key: 'current', label: 'Current Password' },
              { key: 'newPass', label: 'New Password' },
              { key: 'confirm', label: 'Confirm Password' },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-sm text-white/60 mb-2 block">{field.label}</label>
                <input
                  type="password"
                  value={passwordForm[field.key]}
                  onChange={(e) => setPasswordForm({ ...passwordForm, [field.key]: e.target.value })}
                  className="admin-input"
                />
              </div>
            ))}
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between admin-glass rounded-xl p-4">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-white/50">Luxury dark theme (recommended)</p>
              </div>
              <button
                onClick={() => updateSettings('theme', { darkMode: !settings.theme.darkMode })}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.theme.darkMode ? 'bg-purple-600' : 'bg-white/20'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${settings.theme.darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Accent Color</label>
              <select
                value={settings.theme.accentColor}
                onChange={(e) => updateSettings('theme', { accentColor: e.target.value })}
                className="admin-input"
              >
                <option value="purple" className="bg-gray-900">Purple</option>
                <option value="pink" className="bg-gray-900">Pink</option>
                <option value="gold" className="bg-gray-900">Gold</option>
              </select>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-4">
            {['instagram', 'facebook', 'twitter', 'youtube'].map((platform) => (
              <div key={platform}>
                <label className="text-sm text-white/60 mb-2 block capitalize">{platform}</label>
                <input
                  value={settings.social[platform]}
                  onChange={(e) => updateSettings('social', { [platform]: e.target.value })}
                  className="admin-input"
                  placeholder={`https://${platform}.com/...`}
                />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Topbar title="Settings" subtitle="Configure your store and admin preferences" />

      <div className="p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            className="admin-card p-4 space-y-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`admin-sidebar-link w-full ${activeSection === section.key ? 'active' : ''}`}
              >
                <section.icon />
                <span>{section.label}</span>
              </button>
            ))}
          </motion.div>

          <motion.div
            className="lg:col-span-3 admin-card p-6 lg:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeSection}
          >
            <h3 className="font-luxury text-xl font-semibold mb-6">
              {sections.find((s) => s.key === activeSection)?.label}
            </h3>

            {renderContent()}

            <motion.button
              onClick={handleSave}
              className="admin-btn-primary flex items-center gap-2 mt-8"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiSave />
              {saved ? 'Saved!' : 'Save Changes'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
