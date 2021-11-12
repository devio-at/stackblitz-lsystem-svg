import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  SimpleChange,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import * as SvgPanZoom from "svg-pan-zoom";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-svg",
  templateUrl: "./svg.component.html",
  styleUrls: ["./svg.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SvgComponent implements OnInit, AfterViewInit {
  @Input()
  viewBox: string;
  @Input()
  svgContent: string;

  svgInnerHtml: SafeHtml;

  // https://github.com/ariutta/svg-pan-zoom
  private options = {
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: true,
    center: true
  };

  @ViewChild("theSvg", { static: false })
  theSvg: SVGElement;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  private svgPanZoom: SvgPanZoom.Instance;

  ngAfterViewInit() {
    console.log("svg.component ngAfterViewInit");
    this.createSvgPanZoom();
    this.resetPanZoom();

    /*setTimeout(() => {
      var svgElement = document.querySelector('#theSvg');
      this.svgPanZoom = SvgPanZoom(svgElement as any, this.options);
      this.resetPanZoom();
    });*/
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    const log: string[] = [];
    console.log("svg.component ngOnChanges");
    for (const propName in changes) {
      const changedProp = changes[propName];

      /*const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        console.log(`svg.component Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        console.log(`svg.component ${propName} changed from ${from} to ${to}`);
      }*/

      switch (propName) {
        case "svgContent":
          this.destroySvgPanZoom();

          var svg = changedProp.currentValue; //`<g>${changedProp.currentValue}</g>`;
          this.svgInnerHtml = this.sanitizer.bypassSecurityTrustHtml(svg);

          setTimeout(() => {
            try {
              this.createSvgPanZoom();
              this.resetPanZoom();
            } catch (e) {
              console.log("oops createSvgPanZoom");
            }
          });
          break;
      }
    }
    //console.log("svg.component " + log.join(', '));

    /*
    svg = `<g transform="translate(0,${gs.getMaxY() * scale})">
    <g transform="scale(1,-1)">
    ${svg}</g></g>`;
    this.symbolSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
*/

    //console.log("symbol: " + JSON.stringify(this.symbol));
    //console.log("lineSymbol: " + JSON.stringify(this.lineSymbol));
  }

  private createSvgPanZoom() {
    try {
      var options = Object.assign({}, this.options);
      this.svgPanZoom = svgPanZoom((this.theSvg as any).nativeElement, options);
    } catch (e) {
      console.log("oops createSvgPanZoom");
    }
  }

  private destroySvgPanZoom() {
    if (this.svgPanZoom) {
      try {
        this.svgPanZoom.destroy();
      } catch (e) {
        console.log("oops destroySvgPanZoom");
      }
    }
  }

  private resetPanZoom() {
    if (this.svgPanZoom) {
      this.svgPanZoom.resize();
      this.svgPanZoom.fit();
      this.svgPanZoom.center();
      this.svgPanZoom.enableControlIcons();
    } else {
      console.log("resetPanZoom: svg is null");
    }
  }
}
