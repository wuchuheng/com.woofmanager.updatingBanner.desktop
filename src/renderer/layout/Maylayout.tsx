import React, { useCallback } from 'react';
import TitleBar from './TitleBar';
import { ConfigProvider, theme, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Bootloading } from './Bootloading';
import { MessageInstance } from 'antd/es/message/interface';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

export const MessageContext = React.createContext<MessageInstance | undefined>(undefined);

export const MainLayout: React.FC = props => {
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
            <Bootloading>
              <SidebarLayout>
                <Outlet />
              </SidebarLayout>
            </Bootloading>
          </main>
        </div>
      </MessageContext.Provider>
    </ConfigProvider>
  );
};

type SideItem = {
  label: string;
  route: string;
};
type SidebarLayoutProps = {
  children: React.ReactNode;
};
export const SidebarLayout: React.FC<SidebarLayoutProps> = props => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onChangeRoute = (routePath: string) => navigate(routePath);

  /** Gets the current route path using react-router's useLocation hook. */
  const { pathname } = useLocation();
  console.log(`pathname: ${pathname}`);

  const sidebarList: SideItem[] = [
    {
      label: t('layout.account'),
      route: '/',
    },
    {
      label: t('layout.changingBanner'),
      route: '/changingBanner',
    },
    {
      label: t('layout.package'),
      route: '/package',
    },
  ];

  return (
    <div className="flex h-full">
      <aside className="w-24 border-r border-gray-200">
        {sidebarList.map((item, index) => (
          <div
            key={item.route}
            onClick={() => onChangeRoute(item.route)}
            className={`p-2 ${pathname === item.route ? 'bg-primary-500 text-white' : ''}`}
          >
            {item.label}
          </div>
        ))}
      </aside>
      <main className="flex-1 overflow-y-auto">{props.children}</main>
    </div>
  );
};
