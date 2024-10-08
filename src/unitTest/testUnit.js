import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginPage from '../pages/login/login';
import api from '../config/axios';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../config/axios'); // Mock the axios module

describe('<LoginPage />', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('calls login API with email and password when submitted', async () => {
    // Arrange
    const mockUser = { email: 'huy@gmail.com', password: '220304' };
    api.post.mockResolvedValueOnce({ data: { success: true, username: 'user1' } });

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    // Act
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: mockUser.email },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: mockUser.password },
    });
    fireEvent.click(screen.getByText(/Login/i));

    // Assert
    expect(api.post).toHaveBeenCalledWith('login', mockUser);
    expect(api.post).toHaveBeenCalledTimes(1);
  });
});
