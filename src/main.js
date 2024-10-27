import { removeDatabaseNameFromQuery } from './helpers';
import {
    compileCreateView as mysqlCompileCreateView,
    compileDropView as mysqlCompileDropView
} from './mysql';

const ITEM_TYPE_VIEW = 'VIEW';

globalThis.copyCreateViewSyntax = function (context) {
    let item = context.clickedItem();

    if (! item || item.type() !== ITEM_TYPE_VIEW) {
        context.alert('Error', 'Please select a view to copy the syntax.');
        return;
    }

    context.itemDefinition(item, function (query) {
        let normalizedQuery = removeDatabaseNameFromQuery(item.schema(), query);
        let compiledCreateView = null;

        switch (context.driver()) {
            case 'MySQL':
            case 'MariaDB':
            case 'PostgreSQL':
                compiledCreateView = mysqlCompileCreateView(
                    item.name(),
                    normalizedQuery,
                    false,
                );
                break;
            default:
                context.alert(`The driver "${context.driver()}" is not supported.`);
                return;
        }

        SystemService.insertToClipboard(compiledCreateView);
        SystemService.notify('Syntax copied', 'The CREATE VIEW statement has been copied to the clipboard.');
    });
};

globalThis.copyCreateOrReplaceViewSyntax = function (context) {
    let item = context.clickedItem();

    if (! item || item.type() !== ITEM_TYPE_VIEW) {
        context.alert('Error', 'Please select a view to copy the syntax.');
        return;
    }

    context.itemDefinition(item, function (query) {
        let normalizedQuery = removeDatabaseNameFromQuery(item.schema(), query);
        let compiledCreateView = null;

        switch (context.driver()) {
            case 'MySQL':
            case 'MariaDB':
            case 'PostgreSQL':
                compiledCreateView = mysqlCompileCreateView(
                    item.name(),
                    normalizedQuery,
                    true,
                );
                break;
            default:
                context.alert(`The driver "${context.driver()}" is not supported.`);
                return;
        }

        SystemService.insertToClipboard(compiledCreateView);
        SystemService.notify('Syntax copied', 'The CREATE OR REPLACE VIEW statement has been copied to the clipboard.');
    });
};

globalThis.copyDropViewSyntax = function (context) {
    let item = context.clickedItem();

    if (! item || item.type() !== ITEM_TYPE_VIEW) {
        context.alert('Error', 'Please select a view to copy the syntax.');
        return;
    }

    let compiledDropView = null;

    switch (context.driver()) {
        case 'MySQL':
        case 'MariaDB':
        case 'PostgreSQL':
            compiledDropView = mysqlCompileDropView(item.name(), false);
            break;
        default:
            context.alert(`The driver "${context.driver()}" is not supported.`);
            return;
    }

    SystemService.insertToClipboard(compiledDropView);
    SystemService.notify('Syntax copied', 'The DROP VIEW statement has been copied to the clipboard.');
};

globalThis.copyDropViewIfExistsSyntax = function (context) {
    let item = context.clickedItem();

    if (! item || item.type() !== ITEM_TYPE_VIEW) {
        context.alert('Error', 'Please select a view to copy the syntax.');
        return;
    }

    let compiledDropView = null;

    switch (context.driver()) {
        case 'MySQL':
        case 'MariaDB':
        case 'PostgreSQL':
            compiledDropView = mysqlCompileDropView(item.name(), true);
            break;
        default:
            context.alert(`The driver "${context.driver()}" is not supported.`);
            return;
    }

    SystemService.insertToClipboard(compiledDropView);
    SystemService.notify('Syntax copied', 'The DROP IF EXISTS VIEW statement has been copied to the clipboard.');
};
