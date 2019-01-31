import { h, Component } from "preact";
import { layerProvider } from './LayerBase';
import { drawTextLayer } from 'ssig-renderer';

export default layerProvider(drawTextLayer);
