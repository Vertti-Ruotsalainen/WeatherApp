import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorMessage-komponentti
 *
 * Props:
 * @param {string} message – Näytettävä virheteksti.
 * @param {'warning' | 'error'} [type='error'] – Viestin tyyli (esim. keltainen varoitus tai punainen virhe).
 *
 * Toiminta:
 * - Renderöi tekstin tyyliteltynä alert-boxina.
 *
 * Jatkokehitys:
 * - Lisää “Yritä uudelleen” -nappi callbackilla (esim. onRetry-propsi).
 * - Lokitus- ja analytiikkatuki (esim. Sentry).
 */
function ErrorMessage({ message, type = 'error' }) {
  return (
    <div className={`error-message ${type}`}>
      <p>{message}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['warning', 'error']),
};

export default ErrorMessage;
