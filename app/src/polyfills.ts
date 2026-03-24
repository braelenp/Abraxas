import { Buffer } from 'buffer';
import process from 'process';

globalThis.Buffer = Buffer;
globalThis.global = globalThis;
globalThis.process = process;
