import React from 'react';
import styles from './styles/Footer.module.css'

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
  )
}

export default Footer
