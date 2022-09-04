import Image from 'next/image';
import styles from '../styles/Loader.module.css';

const Loader = () => {
    return(
        <>
            <div styles={styles.container}>
            <Image src="/icon/loader.svg"   layout="fill" height={50} width={50}/>
            </div>
        </>
    )
}

export default Loader