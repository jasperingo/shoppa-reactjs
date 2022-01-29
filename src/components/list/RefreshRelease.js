
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function RefreshRelease() {

  const { t } = useTranslation();

  return (
    <div className="text-center my-2">
      <span className="inline-block bg-color-primary text-inverse-color rounded-2xl p-2 text-sm">{ t('_extra.Let_go_to_refresh') }</span>
    </div>
  );
}
