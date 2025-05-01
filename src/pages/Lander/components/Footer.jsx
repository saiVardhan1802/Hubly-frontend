import React from 'react';
import styles from './styles/Footer.module.css'
import PlexifyIcon from '../../../assets/global/PlexifyIcon.svg';
import { discordIcon, figmaIcon, instaIcon, linkedInIcon, mailIcon, twitterIcon, youTubeIcon } from '../../../assets/lander/images';

const Footer = () => {
    const product = [
        "Universal checkout",
        "Payment workflows",
        "Observability",
        "UpliftAI",
        "Apps & integrations"
    ];

    const resources = [
        "Blog",
        "Success stories",
        "News room",
        "Terms",
        "Privacy"
    ];

    const primer = [
        "Expand to new markets",
        "Boost payment success",
        "Improve conversion rates",
        "Reduce payment fraud",
        "Recover revenue"
    ];

    const developers = [
        "Primer Docs",
        "API Reference",
        "Payment methods guide",
        "Service status",
        "Community"
    ];

    const company = ["Careers"]
    return (
        <div className={styles.footerContainer}>
            <div style={{
                display: 'flex',
                color: '#184E7F',
                marginTop: '10%',
                fontSize: '2rem'
            }}>
                <img src={PlexifyIcon} alt="plexify icon" style={{
                    width: '30%',
                    height: 'auto'
                }} />
                <h1>Hubly</h1>
            </div>
            <div className={styles.footer}>
                <div className={styles.column}>
                    <h4 className={styles.title}>Product</h4>
                    <ul className={styles.list}>
                        {product.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.column}>
                    <h4 className={styles.title}>Why Primer</h4>
                    <ul className={styles.list}>
                        {primer.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.column}>
                    <h4 className={styles.title}>Developers</h4>
                    <ul className={styles.list}>
                        {developers.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.column}>
                    <h4 className={styles.title}>Resources</h4>
                    <ul className={styles.list}>
                        {resources.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.column}>
                    <h4 className={styles.title}>Company</h4>
                    <ul className={styles.list}>
                        {company.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div style={{
                display: 'flex',
                position: 'absolute',
                bottom: '5%',
                right: '2%',
                gap:
                '1em',
                alignItems: 'center'
            }}>
                <img src={mailIcon} alt="" />
                <img src={linkedInIcon} alt="" />
                <img src={twitterIcon} alt="" />
                <img src={youTubeIcon} alt="" />
                <img src={discordIcon} alt="" />
                <img src={figmaIcon} alt="" />
                <img src={instaIcon} alt="" />
            </div>
        </div>
    )
}

export default Footer
