import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  Timestamp 
} from 'firebase/firestore';
import { CanvasElement } from '../types';

// Your Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface LayoutData {
  elements: CanvasElement[];
  createdAt: Timestamp;
  name: string;
}

export const saveLayoutToFirestore = async (
  elements: CanvasElement[],
  name: string = `Layout ${new Date().toLocaleString()}`
): Promise<string> => {
  try {
    const layoutData: LayoutData = {
      elements,
      createdAt: Timestamp.now(),
      name,
    };

    const docRef = await addDoc(collection(db, 'layouts'), layoutData);
    console.log('Layout saved with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving layout to Firestore: ', error);
    throw error;
  }
};

export const generateCodePrompt = (elements: CanvasElement[]): string => {
  // Convert the elements array to a formatted string representation
  const elementsDescription = elements.map(element => {
    const { type, properties, position } = element;
    
    let description = `${type} at position (${Math.round(position.x)}, ${Math.round(position.y)})`;
    
    switch (type) {
      case 'Button':
        description += ` with text "${properties.text}" and color ${properties.color}`;
        break;
      case 'Heading':
        description += ` (${properties.size}) with text "${properties.text}"`;
        break;
      case 'Paragraph':
        description += ` with text "${properties.text.substring(0, 50)}${properties.text.length > 50 ? '...' : ''}"`;
        break;
      case 'Image':
        description += ` with URL "${properties.url}" and alt text "${properties.alt}"`;
        break;
    }
    
    return description;
  }).join('\n- ');

  // Create the prompt for CodeLlama
  const prompt = `Generate the complete code for a React component in a single .tsx file. The component should render the following UI elements:

- ${elementsDescription}

Use functional components with hooks and TailwindCSS for styles. Position the elements according to their coordinates. Make sure the component is responsive and well-styled.`;

  return prompt;
};

export const generateCodeFromLayout = async (
  elements: CanvasElement[],
  modelEndpoint: string = 'YOUR_CODELLAMA_ENDPOINT'
): Promise<string> => {
  const prompt = generateCodePrompt(elements);
  
  try {
    // This is a placeholder for the actual API call to CodeLlama
    // In a real implementation, you would make an API call to your language model
    console.log('Sending prompt to language model:', prompt);
    
    // Simulated API call
    // const response = await fetch(modelEndpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ prompt }),
    // });
    
    // const data = await response.json();
    // return data.generatedCode;
    
    // For now, return the prompt as a placeholder
    return `/* 
      This would be the generated code from CodeLlama based on the prompt:
      ${prompt}
    */`;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
};