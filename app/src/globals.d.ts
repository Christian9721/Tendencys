interface GlobalDocument extends Document {
    startViewTransition?: () => void; // Puedes ajustar el tipo de retorno y los parámetros según corresponda
}

// Declara la variable global document con la interfaz extendida
declare var document: GlobalDocument;