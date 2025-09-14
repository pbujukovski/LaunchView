export interface LaunchOption {
    value: string;
    label: string;
  }
  
  export const LaunchOptions: LaunchOption[] = [
    { value: 'latest',   label: 'Latest Launch' },
    { value: 'upcoming', label: 'Upcoming Launches' },
    { value: 'past',     label: 'Past Launches' },
  ];