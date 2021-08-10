import { QueryClient, QueryClientProvider } from 'react-query';
import Contacts from './containers/Contacts';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Contacts />
    </QueryClientProvider>
  );
};

export default App;
