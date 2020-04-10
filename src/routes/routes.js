
import { 
        Home,
        Mision,
        Donate,
        Staff,
        Contact
       } from '../components';

  export default () => [
    {
      path: '/',
      exact: true,
      component: Home
    },
    {
      path:'/mision',
      component:Mision
    },
    {
      path:'/donate',
      component:Donate
    },
    {
      path:'/staff',
      component:Staff
    },
    {
      path:'/contact',
      component:Contact
    },
    {
      path:'/contact',
      component: Contact
    }
    
  ]