import { App } from 'adapt-authoring-core';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
App.instance.onReady().catch(e => console.error(e));