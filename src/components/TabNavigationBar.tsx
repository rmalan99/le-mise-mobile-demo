import { IonLabel, IonTabBar, IonTabButton } from '@ionic/react'
import type { Icon as TablerIcon } from '@tabler/icons-react'
import { IconCompass, IconHeart, IconHome2, IconUser } from '@tabler/icons-react'

type TabItem = {
  tab: string
  href: string
  label: string
  Icon: TablerIcon
}

const tabs: TabItem[] = [
  {
    tab: 'home',
    href: '/tabs/home',
    label: 'Home',
    Icon: IconHome2,
  },
  {
    tab: 'explore',
    href: '/tabs/explore',
    label: 'Explorar',
    Icon: IconCompass,
  },
  {
    tab: 'favorites',
    href: '/tabs/favorites',
    label: 'Favoritos',
    Icon: IconHeart,
  },
  {
    tab: 'profile',
    href: '/tabs/profile',
    label: 'Perfil',
    Icon: IconUser,
  },
]

function TabNavigationBar() {
  return (
    <IonTabBar slot="bottom" className="tab-navigation-bar">
      {tabs.map(({ tab, href, label, Icon }) => (
        <IonTabButton key={tab} tab={tab} href={href} className="tab-navigation-bar__button">
          <Icon size={22} stroke={1.9} className="tab-navigation-bar__icon" aria-hidden="true" />
          <IonLabel>{label}</IonLabel>
        </IonTabButton>
      ))}
    </IonTabBar>
  )
}

export default TabNavigationBar
