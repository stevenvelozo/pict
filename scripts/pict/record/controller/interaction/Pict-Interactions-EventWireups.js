/**
* This file is the interaction code for record displays
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Record Set Interaction Patterns
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	["pict/record/controller/interaction/Pict-Interactions-KeyboardHandlers"],
	function(PictInteractionsKeyboardHandlers)
	{
		var _Pict;
		var _Router;

		var _KeyHandler = PictInteractionsKeyboardHandlers;

		////////// Initialization //////////
		function oInitialize(pPict, pRouter)
		{
			_Pict = pPict;
			_Router = pRouter;

			_KeyHandler.Initialize(pPict, pRouter);
		}


		////////// Wire Up Events for Updating a Record //////////
		function doWireUpPictUpdate(pRecord)
		{
			// Until we implement change management we should not use keystrokes here.
			//Mousetrap.bind(['esc'], _KeyHandler.TriggerRead);
			Mousetrap.reset();
			$('.pictDatePicker').datetimepicker();
			_Pict.dataLists.CheckAllValuesFromAttribute();
			Mousetrap.bind(['ctrl+esc'], _KeyHandler.TriggerList);
			$('.pictFirstFocus').first().focus();
		}

		////////// Wire Up Events for Viewing a Record //////////
		function doWireUpPictRecordView(pRecord)
		{
			Mousetrap.bind(['esc', 'l'], _KeyHandler.TriggerList);
			Mousetrap.bind(['e', 'ctrl+e'], _KeyHandler.TriggerEdit);
			Mousetrap.bind(['n'], _KeyHandler.TriggerNextRecord);
			Mousetrap.bind(['p'], _KeyHandler.TriggerPreviousRecord);
			Mousetrap.bind(['a'], _KeyHandler.TriggerCreate, 'keyup');
			Mousetrap.bind(['d'], _KeyHandler.TriggerDuplicate, 'keyup');
			$('.pictToggleRecordInformation').click
			(
				function(pEvent)
				{
					$('.dFRecordInformation').toggleClass('hidden');
					$('.pictToggleRecordInformation span').toggleClass('hidden');
					return false;
				}
			);
			_Pict.dataLists.AutoFillValuesByID();
		}

		////////// Wire Up Events for the List Wrapper Controls //////////
		function doWireUpPictListWrapper(pWireUpKeyboard)
		{
			var tmpWireUpKeyboard = (typeof(pWireUpKeyboard) === 'undefined') ? true : pWireUpKeyboard;
			////////// Wire up Filter Controls //////////
			if (tmpWireUpKeyboard)
			{
				Mousetrap.bind(['1'], _KeyHandler.TriggerFirstRecord);
				Mousetrap.bind(['p'], _KeyHandler.TriggerListPrevious);
				Mousetrap.bind(['n'], _KeyHandler.TriggerListNext);
				Mousetrap.bind(['a'], _KeyHandler.TriggerCreate, 'keyup');
			}
		}

		////////// Wire Up Events for a Specific Page in a List //////////
		function doWireUpPictList(pRecord, pWireClicks)
		{
			var tmpWireClicks = (typeof(pWireClicks) === 'undefined') ? true : pWireClicks;

			// Wire up all In-List Bootstrap Menus
			$('.dropdown-toggle').dropdown();
			// Wire up all In-List Bootstrap Tool Tips
			$('.pictToolTipCell').tooltip();
			// Wire up Clicking on Cell Action
			if (tmpWireClicks)
			{
				// This is to prevent clicks on tooltips in lists from firing their link
				$('.pictDeadLink').click
				(
					function(pEvent)
					{
						return false;
					}
				);
				$('.pictHoverTable tr').click
				(
					function(pEvent)
					{
						// This prevents the click from going through if it's a link the user clicked on
						if (($(pEvent.target).attr('role') != 'menuitem') && (!$(pEvent.target).is('button')) && ((!$(pEvent.target).is('a')) || $(pEvent.target).hasClass('pictToolTipCell')))
						{
							var tmpRecordViewLink = false;
							if ($(this).hasClass('pictCustomClick'))
								tmpRecordViewLink = $(this).attr("CustomLink");
							else
								tmpRecordViewLink = $(this).find('.pictListViewLink').attr("href");

							if (tmpRecordViewLink)
								_Router.navigate(tmpRecordViewLink, {trigger: true});
						}
					}
				);
			}
			// Wire up Cell Hover Highlight
			$('.pictHoverTable tr').hover
			(
				// This shows and hides the menu on hover.
				function(pEvent)
				{
					var tmpElement = this;

					// Stop events from bubbling down.
					pEvent.stopPropagation();
					if ($(this).hasClass('pictHoverIgnore'))
						return false;

					// Make the button on the right visible
					$(this).find('.pictHoverTableRowControl').addClass('pictHoverTableRowControlVisible');

					// Remove Controls from other rows
					$(this).siblings('[Hovered=1]').each(
						function(pIndex)
						{
							// Make the button translucent again
							$(this).find('.pictHoverTableRowControl').removeClass('pictHoverTableRowControlVisible');
							// Close the menu if it is open
							if ($(this).find('.pictHoverTableRowControl').parent().hasClass('open'))
								$(this).find('.pictHoverTableRowControl').click();
							// Remove the hovered state
							$(this).attr('Hovered', '0');
						}
					);

					// Set this row to know it's being hovered over.
					$(this).attr('Hovered', '1');
				},
				function () { }
			);

			_Pict.dataLists.AutoFillValuesByID();
		}


		////////// Return Object //////////
		oRecordInteractions = (
		{
			Initialize: oInitialize,

			WireUpPictRecordView: doWireUpPictRecordView,
			WireUpPictListWrapper: doWireUpPictListWrapper,
			WireUpPictList: doWireUpPictList,
			WireUpPictUpdate: doWireUpPictUpdate
		});

		return oRecordInteractions;
	}
);