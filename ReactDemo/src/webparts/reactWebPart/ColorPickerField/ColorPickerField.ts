import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-webpart-base';
import { IColorPickerFieldProps } from "./IColorPickerFieldProps";

export class ColorPickerField implements IPropertyPaneField<IColorPickerFieldProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IColorPickerFieldProps;
    public container: HTMLElement;
    constructor(targetProperty: string, properties: IColorPickerFieldProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            ...properties,
            key: targetProperty,
            onRender: this.onRender.bind(this),
            onDispose: this.onDispose.bind(this)
        };
    }

    private onRender(elem: HTMLElement): void {
        let self = this;
        if (!this.container) {//if we already have elem our controls already been populated. (todo: check if we need to reload web part properties values and reset them to our observables)
            this.container = elem;

            this.onDispose();

            //add my UI:
            this.buildColorPicker();
        }
    }

    private onDispose(): void {
        if (this.container)
            //clean up existing content. This property may be rendered multiple times, every time the PropertyPane re-renders, like when another field was validated.
            while (this.container.firstChild)
                this.container.removeChild(this.container.firstChild);
    }
    private buildColorPicker() {
        if (this.properties.label && this.properties.label.length) {
            let label = document.createElement("label");
            this.container.appendChild(label);
            label.innerHTML = this.properties.label;
        }

        let div = document.createElement("div");
        this.container.appendChild(div);
        div.style.height = "30px";
        if (this.properties.currentValue)
            div.style.backgroundColor = this.properties.currentValue;

        let colorPicker = document.createElement("div");
        this.container.appendChild(colorPicker);
        colorPicker.style.border = 'solid 1px #ccc';
        colorPicker.style.padding = '5px';

        let canvasBlock = document.createElement("canvas");
        colorPicker.appendChild(canvasBlock);
        canvasBlock.style.height = "150px";
        canvasBlock.style.width = "80%";
        canvasBlock.style.cursor = "crosshair";
        let blockCtx = canvasBlock.getContext('2d');
        let blockHeight = canvasBlock.height;
        let blockWidth = canvasBlock.width;

        let canvasDivider = document.createElement("canvas");
        colorPicker.appendChild(canvasDivider);
        canvasDivider.style.width = "2%";

        let canvasStrip = document.createElement("canvas");
        colorPicker.appendChild(canvasStrip);
        canvasStrip.style.height = "150px";
        canvasStrip.style.width = "18%";
        canvasStrip.style.cursor = "crosshair";
        let stripCtx = canvasStrip.getContext('2d');
        let stripHeight = canvasStrip.height;
        let stripWidth = canvasStrip.width;

        let x = 0;
        let y = 0;
        let drag = false;
        let rgbaColor = 'rgba(255,0,0,1)';

        let fillGradient = () => {
            blockCtx.fillStyle = rgbaColor;
            blockCtx.fillRect(0, 0, blockWidth, blockHeight);

            let grdWhite = stripCtx.createLinearGradient(0, 0, blockWidth, 0);
            grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
            grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
            blockCtx.fillStyle = grdWhite;
            blockCtx.fillRect(0, 0, blockWidth, blockHeight);

            var grdBlack = stripCtx.createLinearGradient(0, 0, 0, blockHeight);
            grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
            grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
            blockCtx.fillStyle = grdBlack;
            blockCtx.fillRect(0, 0, blockWidth, blockHeight);
        };

        let changeColor = (e) => {
            x = e.offsetX;
            y = e.offsetY;
            var imageData = blockCtx.getImageData(x, y, 1, 1).data;
            rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
            div.style.backgroundColor = rgbaColor;
            if (this.properties.triggerChangeOnDrag)
                this.properties.onPropertyChange(this.targetProperty, rgbaColor);
        };

        let click = (e) => {
            x = e.offsetX;
            y = e.offsetY;
            var imageData = stripCtx.getImageData(x, y, 1, 1).data;
            rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
            fillGradient();
        };

        let mousedown = (e) => {
            drag = true;
            changeColor(e);
        };

        let mousemove = (e) => {
            if (drag) {
                changeColor(e);
            }
        };

        let mouseup = (e) => {
            drag = false;
            this.properties.onPropertyChange(this.targetProperty, rgbaColor);
        };

        blockCtx.rect(0, 0, blockWidth, blockHeight);
        fillGradient();

        stripCtx.rect(0, 0, stripWidth, stripHeight);
        var grd1 = stripCtx.createLinearGradient(0, 0, 0, blockHeight);
        grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
        grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
        stripCtx.fillStyle = grd1;
        stripCtx.fill();

        canvasStrip.addEventListener("click", click, false);

        canvasBlock.addEventListener("mousedown", mousedown, false);
        canvasBlock.addEventListener("mouseup", mouseup, false);
        canvasBlock.addEventListener("mousemove", mousemove, false);
    }
}