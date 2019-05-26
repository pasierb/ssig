import drawRectangularLayer from "./drawRectangularLayer";
import { createCanvas, Image, loadImage } from 'canvas';
import { PNG } from 'pngjs'; 
import pixelmatch from 'pixelmatch';
import fs from 'fs';
import path from 'path';

function expectCanvasMatchFixture(canvas, fixtureName) {
    return new Promise((resolve, reject) => {
        let filesRead = 0;

        const doneReading = () => {
            if (++filesRead < 2) return;

            let diff = new PNG({ width: expected.width, height: expected.height });

            const pixelDelta = pixelmatch(expected.data, actual.data, diff.data, expected.width, expected.height, { threshold: 0.1 });

            expect(pixelDelta).toBe(0);

            if (pixelDelta !== 0) {
                // TODO: save diff image
                // diff.pack().pipe(fs.createWriteStream('diff.png'));
            }

            resolve(pixelDelta);
        }

        let expected = fs.createReadStream(path.join(__dirname, `../test/fixtures/${fixtureName}`)).pipe(new PNG()).on('parsed', doneReading);
        let actual = canvas.createPNGStream().pipe(new PNG()).on('parsed', doneReading);

    })
}

describe('drawRectangularLayer', function() {
    it('renders rectangular at coordinates', async function() {
        const result = await drawRectangularLayer(createCanvas(500, 500), {
            x: 100,
            y: 100,
            typeData: {
                width: 150,
                height: 200,
                color: '#fff'
            }
        });

        // result.createPNGStream().pipe(fs.createWriteStream('./react-150x200.png'));
        await expectCanvasMatchFixture(result, 'react-150x200.png');
    });
});
