'use client';

import { Printer } from 'lucide-react';
import styles from './publication.module.css';

export function PublicationPrint() {
  return <button type="button" className={styles.printButton} onClick={() => window.print()}><Printer size={16} aria-hidden="true"/>Print / save PDF</button>;
}
