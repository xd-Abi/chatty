/**
 * @packageDocumentation
 * @module Gateway-Controller
 */

import { Controller, Get } from '@nestjs/common';

@Controller()
export class GatewayController {
  @Get()
  async getHello() {
    return 'Hello World!';
  }
}
