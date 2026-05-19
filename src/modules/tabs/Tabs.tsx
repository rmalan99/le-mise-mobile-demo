import { IonRouterOutlet, IonTabs } from '@ionic/react'
import { Redirect, Route } from 'react-router-dom'
import TabNavigationBar from './components/TabNavigationBar'
import HomePage from './pages/home/HomePage'
import CategoriesPage from './pages/categories/CategoriesPage'
import ExplorePage from './pages/explore/ExplorePage'
import FavoritesPage from './pages/favorites/FavoritesPage'
import PlanPage from './pages/plan/PlanPage'
import ProfileLanguagePage from './pages/profile/ProfileLanguagePage'
import ProfilePage from './pages/profile/ProfilePage'
import ProfilePreferencesPage from './pages/profile/ProfilePreferencesPage'
import RecipeDetailPage from '@/modules/recipes/pages/detail/RecipeDetailPage'

function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={HomePage} />
        <Route exact path="/tabs/categories" component={CategoriesPage} />
        <Route exact path="/tabs/explore" component={ExplorePage} />
        <Route exact path="/tabs/recipes/:recipeId" component={RecipeDetailPage} />
        <Route exact path="/tabs/favorites" component={FavoritesPage} />
        <Route exact path="/tabs/plan" component={PlanPage} />
        <Route exact path="/tabs/profile/language" component={ProfileLanguagePage} />
        <Route exact path="/tabs/profile/preferences" component={ProfilePreferencesPage} />
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
