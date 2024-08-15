import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BotContext } from './BotContext';
import { InitializeBot } from '../../../wailsjs/go/bot/Bot';
import { storageKeys } from '../../context/storageKeys';
import { bot } from '../../../wailsjs/go/models';

export interface BotProviderProps {
  children: ReactNode;
}

export const BotProvider: React.FC<BotProviderProps> = ({ children }) => {
  const [botInfo, setBotInfo] = useState<bot.BotInfo>({
    username: '',
    avatarURL: '',
  });
  const [error, setError] = useState('');
  const [token, setToken] = useState(
    localStorage.getItem(storageKeys.BOT_TOKEN)
  );
  const [userToken, setUserToken] = useState(
    localStorage.getItem(storageKeys.USER_TOKEN)
  );
  const [clientId, setClientId] = useState(
    localStorage.getItem(storageKeys.BOT_CLIENT_ID)
  );
  const [clientSecret, setClientSecret] = useState(
    localStorage.getItem(storageKeys.BOT_CLIENT_SECRET)
  );
  const [redirectURI, setRedirectURI] = useState(
    localStorage.getItem(storageKeys.BOT_REDIRECT_URI)
  );

  const reset = () => {
    localStorage.removeItem(storageKeys.BOT_TOKEN);
    setToken(null);
  };

  const signOut = async () => {
    console.log('sign out');
  };

  const handleChangeUserToken = (nextToken: string) => {
    setUserToken(nextToken);
    localStorage.setItem(storageKeys.USER_TOKEN, nextToken);
  };

  const handleChangeToken = async (
    nextToken: string,
    clientId: string,
    redirectURI: string,
    clientSecret: string
  ) => {
    try {
      console.log(nextToken, clientId, redirectURI);

      await InitializeBot(nextToken);

      setError('');
      setToken(nextToken);
      setClientId(clientId);
      setClientSecret(clientSecret);
      setRedirectURI(redirectURI);
      localStorage.setItem(storageKeys.BOT_TOKEN, nextToken);
      localStorage.setItem(storageKeys.BOT_CLIENT_ID, clientId);
      localStorage.setItem(storageKeys.BOT_CLIENT_SECRET, clientSecret);
      localStorage.setItem(storageKeys.BOT_REDIRECT_URI, redirectURI);

      return;
    } catch (error) {
      setError(String(error));
      throw error;
    }
  };

  return (
    <BotContext.Provider
      value={{
        signOut,
        setBotSetting: handleChangeToken,
        botInfo,
        setBotInfo,
        token,
        redirectURI,
        clientId,
        clientSecret,
        userToken,
        errorMessage: error,
        reset,
        setUserToken: handleChangeUserToken,
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

export const useBot = () => useContext(BotContext);
