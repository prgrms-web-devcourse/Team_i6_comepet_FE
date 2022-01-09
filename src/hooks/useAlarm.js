import { useContext } from 'react';
import { AlarmContext } from '@/contexts/AlarmProvider';

const useAlarm = () => {
  return useContext(AlarmContext);
};

export default useAlarm;
