import { IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

function App() {
  return (
    <IonApp>
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Le Mise App Demo</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-50">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              <h1 className="text-4xl font-semibold tracking-tight text-white">
                Base inicial lista para construir.
              </h1>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  )
}

export default App
