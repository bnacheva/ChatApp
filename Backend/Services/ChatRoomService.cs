using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Helpers;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public class ChatRoomService : IChatRoomService
    {
        private readonly DataContext _context;

        public ChatRoomService(DataContext context) 
        {
            _context = context;
        }

        public async Task<List<ChatRoom>> GetChatRoomsAsync()
        {
            var chatRooms = await _context.ChatRooms.ToListAsync<ChatRoom>();

            return chatRooms;
        }

        public async Task<bool> AddChatRoomAsync(ChatRoom chatRoom)
        {
            chatRoom.Id = Guid.NewGuid();

            _context.ChatRooms.Add(chatRoom);

            var saveResults = await _context.SaveChangesAsync();

            return saveResults > 0;
        }
    }
}