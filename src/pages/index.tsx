<<<<<<< HEAD
import styles from './index.module.css';
// import Image from 'next/image';
import { useRouter } from 'next/router';

const GreetUser = () => {
    const router = useRouter();
=======
// import styles from './index.module.css';
// import { useRouter } from 'next/router';
// import React from 'react';
// const GreetUser = () => {
//     const router=useRouter()

//     const HandleClick=()=>{
//         router.push('/auth/signin')

//     }
//     return (

        
//           <div className={styles.logo}>
//           {/* <Image className={styles.image} src="/logo.jpg" alt="logo" width={25} height={25} /> */}
//            <b className={styles.title}>BLOGIEE</b> <br />
//            <p className={styles.des}>
//             Explore the latest tech trends, insights and expert opinion. <br />
//              Enhance your skills and fuel your curiosity <br />
//              Stay Updated, Stay ahead!!
//            </p>
//            <button className={styles.button} onClick={HandleClick}>Start Exploring</button>

//           </div>
        

//     );
// };

// export default GreetUser;



import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function GreetUser() {
    const router=useRouter()
>>>>>>> 6787ee5820f8428e6444f47051e8496dc379c522

    const handleClick = () => {
        router.push('/auth/signin');
    };

<<<<<<< HEAD
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>BLOGIEE</h1>
                <p className={styles.description}>
                    Explore the latest tech trends, insights, and expert opinions. <br />
                    Enhance your skills and fuel your curiosity. <br />
                    Stay Updated, Stay Ahead!!
                </p>
                <button className={styles.button} onClick={handleClick}>Start Exploring</button>
            </div>
        </div>
    );
};

export default GreetUser;

=======
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="p-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-3xl font-bold text-white">B</span>
          </div>
          <h1 className="text-3xl font-bold text-center text-black-600 mb-4">BLOGIEE</h1>
          <p className="text-center text-gray-600 mb-6">
            Explore the latest tech trends, insights, and expert opinions.
            Enhance your skills and fuel your curiosity.
          </p>
          <p className="font-semibold text-center text-blue-600 mb-6">
            Stay Updated, Stay Ahead!
          </p>
          <button 
            onClick={HandleClick} 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            Start Exploring
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 6787ee5820f8428e6444f47051e8496dc379c522
