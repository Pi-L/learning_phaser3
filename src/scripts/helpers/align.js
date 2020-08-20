import { getSizes } from '../config';

export default class Align {
    static scaleToGameW(obj, per) {
        obj.displayWidth = getSizes().width * per;
        obj.scaleY = obj.scaleX;
    }

    static centerH(obj) {
        obj.x = getSizes().width / 2 - obj.displayWidth / 2;
    }

    static centerV(obj) {
        obj.y = getSizes().height / 2 - obj.displayHeight / 2;
    }

    static center2(obj) {
        obj.x = getSizes().width / 2 - obj.displayWidth / 2;
        obj.y = getSizes().height / 2 - obj.displayHeight / 2;
    }

    static center(obj) {
        obj.x = getSizes().width / 2;
        obj.y = getSizes().height / 2;
    }
}
