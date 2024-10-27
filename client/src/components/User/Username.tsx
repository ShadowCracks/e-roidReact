import { useState, useEffect } from 'react';
import ProfileDashboard from './ProfileDashboard';
import supabase from '../../../utils/supabase';

function Username() {
  const [profileOwnerId, setProfileOwnerId] = useState('');

  useEffect(() => {
    const fetchProfileOwnerId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) {
        setProfileOwnerId(user.id);
      }
    };
    
    fetchProfileOwnerId();
  }, []);

  return (
    <div>
      {/* Always render ProfileDashboard, even if profileOwnerId is empty */}
      <ProfileDashboard profileOwnerId={profileOwnerId} />
    </div>
  );
}

export default Username;
