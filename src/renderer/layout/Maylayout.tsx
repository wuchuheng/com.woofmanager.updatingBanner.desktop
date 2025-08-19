import React, { useCallback, useEffect } from 'react';
import TitleBar from './TitleBar';
import { ConfigProvider, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { Bootloading } from './Bootloading';
import { MessageInstance } from 'antd/es/message/interface';
import { message } from 'antd';
import useMessage from 'antd/es/message/useMessage';

export const MessageContext = React.createContext<MessageInstance | undefined>(undefined);

type MainLayoutProps = {
  children: React.ReactNode;
};
export const MainLayout: React.FC<MainLayoutProps> = props => {
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  // Initialize theme on component mount - default to light theme
  React.useEffect(() => {
    // Remove any existing dark class to ensure light theme is default
    document.documentElement.classList.remove('dark');
    setIsDarkTheme(false);
    console.log('Initialize theme on component mount - default to light theme');
  }, []);

  const onToggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkTheme(isDark);
  };

  const { i18n } = useTranslation();

  const onToggleLanguage = useCallback(() => {
    const newLang = i18n.language.startsWith('en') ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  }, [i18n]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {contextHolder}
      <MessageContext.Provider value={messageApi}>
        <div className="flex h-[100vh] flex-col bg-background-primary">
          <TitleBar isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} onToggleLanguage={onToggleLanguage} />
          <main className="flex-1 overflow-y-auto">
            <Bootloading>{props.children}</Bootloading>
          </main>
        </div>
      </MessageContext.Provider>
    </ConfigProvider>
  );
};
