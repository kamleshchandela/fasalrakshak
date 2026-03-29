import React from 'react';
import ChangePinForm from './ChangePinForm';
import NotificationPrefs from './NotificationPrefs';
import DeleteAccountModal from './DeleteAccountModal';

const AccountSettingsTab = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Container A: Change PIN */}
      <ChangePinForm />

      {/* Container B: Notification Prefs */}
      <NotificationPrefs />

      {/* Container C: Danger Zone */}
      <DeleteAccountModal />
    </div>
  );
};

export default AccountSettingsTab;
