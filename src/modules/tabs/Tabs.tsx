import { IonRouterOutlet, IonTabs } from '@ionic/react'
import { Redirect, Route } from 'react-router-dom'
import TabNavigationBar from './components/TabNavigationBar'
import HomePage from './pages/home/HomePage'
import ExplorePage from './pages/explore/ExplorePage'
import FavoritesPage from './pages/favorites/FavoritesPage'
import ProfilePage from './pages/profile/ProfilePage'

function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={HomePage} />
        <Route exact path="/tabs/explore" component={ExplorePage} />
        <Route exact path="/tabs/favorites" component={FavoritesPage} />
        <Route exact path="/tabs/profile" component={ProfilePage} />
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <TabNavigationBar />
    </IonTabs>
  )
}

export default Tabs