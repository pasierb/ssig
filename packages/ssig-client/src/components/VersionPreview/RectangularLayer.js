import { h } from "preact";
import { layerProvider } from './LayerBase';
import { drawRectangularLayer } from 'ssig-renderer';

export default layerProvider(drawRectangularLayer);
