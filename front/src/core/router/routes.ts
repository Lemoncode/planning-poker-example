import { generatePath } from 'react-router-dom';

interface SwitchRoutes {
  root: string;
  player: string;
  master: string;
}

export const switchRoutes: SwitchRoutes = {
  root: '/',
  player: '/player/:room',
  master: '/master/:room',
};

interface Routes extends Omit<SwitchRoutes, 'player' | 'master'> {
  player: (room: string) => string;
  master: (room: string) => string;
}

export const routes: Routes = {
  ...switchRoutes,
  master: room => generatePath(switchRoutes.master, { room }),
  player: room => generatePath(switchRoutes.player, { room }),
};
