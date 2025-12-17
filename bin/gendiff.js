#!/usr/bin/env node

// Убедитесь, что путь правильный
import setupCLI from '../src/cli.js';

const program = setupCLI();
program.parse(process.argv);
