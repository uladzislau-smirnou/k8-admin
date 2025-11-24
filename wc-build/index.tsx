import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';
import { Pipelines } from '../components/pipelines/pipelines';
import styles from '../styles/globals.css?inline';

const PipelinesWithStyles = (props: any) => {
  return (
    <>
      <style>{styles}</style>
      <Pipelines {...props} />
    </>
  );
};

const Pipeline = reactToWebComponent(PipelinesWithStyles, React, ReactDOM, {
  shadow: 'open',
  props: {
    tenantId: 'string',
    theme: 'string',
  },
});

customElements.define('sk8-pipelines', Pipeline);
