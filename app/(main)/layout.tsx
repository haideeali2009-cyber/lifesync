import MainLayout from '@/app/layout-main';

export default function MainGroup({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
